<template>
  <div class="chat-modal-content">
      <div class="chat-select">
        <h3>Chats</h3>
        <div v-for="chat in chats"
          class="chat-user clearfix"
          :class="{'selected': selectedChat === chat.user.id}"
          :key="chat.user.id"
          @click="selectChat(chat)"
        >
              <img class="chat-user-image" :src="chat.user.profileImage">
              <div class="texts">
                <div class="header clearfix">
                  <p class="chat-user-name">{{chat.user.username}}</p>
                  <p class="chat-date" v-if="lastMessage(chat)">
                    {{lastMessageTimeFromNow(chat)}}
                  </p>
                </div>

                <p class="chat-messagepreview" v-if="lastMessage(chat)">
                  {{lastMessage(chat).msg}}
                </p>
              </div>
        </div>
      </div>
      <div class="chat" :class="{'empty': !lastMessage(currentChat)}" v-if="user">
        <div class="messages" ref="messages">
          <transition-group name="fade">
            <div class="message" v-for="message in currentChat.messages"
              :key="message.id"
              :class="{'you': message.author === user.id, 'other': message.author !== user.id}"
            >
              <p>{{message.msg}}</p>
            </div>
          </transition-group>
        </div>
        <transition name="fade">
          <div v-if="!lastMessage(currentChat)" class="no-messages">
            <h5>Ihr habt noch keine Unterhaltung.</h5>
            <p>Schreib {{currentChat.user.username}} doch eine Nachricht :)</p>
          </div>
        </transition>
        <b-form-input
            type="email"
            spellcheck="false"
            class="message-input"
            v-model="msgInput"
            @keydown.enter.native="submitMessage"
          />
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
moment.locale('de');
moment.updateLocale('de', { relativeTime : { s: 'gerade eben'}});

export default {
  data () {
    return {
      chats: [
        {
          user: {
            id: '923840',
            username: 'Lisa',
            profileImage: 'https://vignette.wikia.nocookie.net/camp-halfblood-roleplay/images/a/aa/A_Girl_With_Blonde_Hair_Blue_Eyes.jpg/revision/latest?cb=20130814205740'
          },
          messages: [{ id: '94829384234', author: '034850498339409', msg: 'Ja, das habe ich auch gedacht.', timestamp: 'Thu Feb 15 2018 13:20:07 GMT+0100 (CET)'}, { id: '73478324', author: '1', msg: 'Sind die nicht immer so?', timestamp: 'Thu Feb 15 2018 13:01:07 GMT+0100 (CET)'}]
        },
        {
          user: {
            id: '3478583475',
            username: 'Anna',
            profileImage: 'https://s3.envato.com/files/193435194/preview.jpg'
          },
          messages: []
        }
      ],
      selectedChat: '923840',
      msgInput: ''
    }
  },
  created() {
    //console.log('user', this.user)
  },
  watch: {
    'currentChat.messages': function() {
      const messagesEl = this.$refs.messages;
      console.log(messagesEl);
      setTimeout(() => {
        messagesEl.scrollTop = messagesEl.scrollHeight - messagesEl.clientHeight;
      }, 0)
      
    }
  },
  methods: {
    timestampToDate(timestamp) {
      return moment(timestamp).format('DD.MM.YYYY')
    },
    lastMessage(chat) {
      if (!chat.messages || !chat.messages.length > 0) return null;
      return chat.messages[chat.messages.length - 1];
    },
    lastMessageDate(chat) {
      return this.timestampToDate(this.lastMessage(chat).timestamp);
    },
    lastMessageTimeFromNow(chat) {
      return moment(this.lastMessage(chat).timestamp).fromNow(true);
    },
    selectChat(chat) {
      this.selectedChat = chat.user.id;
    },
    submitMessage() {
      // submit message vuex action
      this.currentChat.messages.push({
        author: '1',
        msg: this.msgInput,
        timestamp: moment(),
        id: Math.random()
      })

      this.msgInput = '';
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    currentChat() {
      return this.chats.find((chat => chat.user.id === this.selectedChat));
    }
  }
}
</script>


<style scoped lang="scss">

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transition: opacity 0s;
  }
  
  .chat-modal-content {
    height: 60vh;
  }

  .chat {
    width: calc(100% - 280px);
    height: 100%;
    float: right;
    position: relative;

    .message-input {
      position: absolute;
      top: auto;
      bottom: 20px;
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.3s;
    }

    .no-messages {
      text-align: center;
      position: absolute;
      width: 100%;
      top: 30%;
    }
  }

  .chat.empty {

    .message-input {
        width: 300px;
        bottom: 40%;
    }
  }

  .messages {
    width: 100%;
    height: 80%;
    overflow-y: auto;
    padding: 20px;

    .message {
      width: 70%;
      padding: 10px;
      border-radius: 3px;
      margin: 5px 0;

      p {
        margin: 0;
      }

      &.you {
        float: right;
        background: $brand-gray-light;
      }

      &.other {
        float: left;
        background: $brand-primary;
        color: #fff;
      }
    }
  }

  .chat-select {
    float: left;
    width: 280px;
    height: 100%;
    background: $brand-dark;

    h3 {
      color: #fff;
      text-align: center;
      padding: 20px;
    }

    .chat-user {
      margin: 10px 0;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;

      &.selected {
      background: $brand-primary;

        .chat-user-name {
          font-size: 24px;
          line-height: 48px;
        }

        .chat-date,
        .chat-messagepreview {
          display: none;
        }

      }

      p {
        margin: 0;
      }

      .chat-user-image {
        border-radius: 100%;
        width: 60px;
        height: 60px;
        object-fit: cover;
      }

      .chat-user-name {
        color: #fff;
        float: left;
        font-size: 18px;
      }

      .chat-date {
        float: right;
        color: $brand-gray-dark;
        font-size: 14px;
        margin-top: 3px;
      }

      .chat-messagepreview {
        color: $brand-gray-dark;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .texts {
        width: calc(100% - 60px);
        padding: 0 10px;
        margin-top: 6px;
      }
      
      img,
      .texts {
        float: left;
      }
    }
  }
</style>