<template>
    <div class="container" style="margin-bottom: 30px">
        <form @submit.prevent="createMessage">
            <div class="form-group">
                <input type="text" name="message" class="form-control" placeholder="Ecrire un message ..." v-model="newMessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>
            <button class="btn btn-primary" type="submit" name="action" v-on:click="NotifyMe">Envoyer</button>
        </form>
    </div>
</template>

<script>
    import fb from '@/firebase/init';
    export default {
        name: 'CreateMessage',
        props: ['name'],
        data(){
            return {
                newMessage: null,
                errorText: null
            }
        },
        methods: {
            createMessage () {
                if (this.newMessage) {
                    fb.collection('messages').add({
                        message: this.newMessage,
                        name: this.name,
                        timestamp: Date.now()
                    }).catch(err => {
                        console.log(err);
                    });
                    this.newMessage = null;
                    this.errorText = null;
                } else {
                    this.errorText = "A message must be entered!"
                }
            },
            NotifyMe(){
                // Voyons si le navigateur supporte les notifications
                if (!("Notification" in window)) {
                    alert("Ce navigateur ne supporte pas les notifications desktop");
                }

                // Voyons si l'utilisateur est OK pour recevoir des notifications
                else if (Notification.permission === "granted") {
                    // Si c'est ok, créons une notification
                    var notification = new Notification(this.newMessage);
                }

                // Sinon, nous avons besoin de la permission de l'utilisateur
                // Note : Chrome n'implémente pas la propriété statique permission
                // Donc, nous devons vérifier s'il n'y a pas 'denied' à la place de 'default'
                else if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {

                    // Quelque soit la réponse de l'utilisateur, nous nous assurons de stocker cette information
                    if(!('permission' in Notification)) {
                        Notification.permission = permission;
                    }

                    // Si l'utilisateur est OK, on crée une notification
                    if (permission === "granted") {
                        var notification = new Notification(this.newMessage);
                    }
                    });
                }
            }
        }
    }
</script>