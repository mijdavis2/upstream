<template>
  <div class="pr-3">
    <div class="m-3">
      <h2>Email</h2>
      <p class="lead alt-lead mb-1">
        *Share reports directly from UpStream!
      </p>
    </div>
    <div class="card p-3">
      <h3>Settings</h3>
      <form>
        <dl>
          <dt><label>My Google Email</label></dt>
          <dd>
            <input class="form-control input-block" type="text" maxlength="30"
                   v-model="myEmail"
                   placeholder="me@gmail.com">
          </dd>
        </dl>
        <span class="text-sm">*Requires gmail account to send emails</span>
        <dl>
          <dt><label>Password</label></dt>
          <dd>
            <input class="form-control input-block" type="password" maxlength="30"
                   id="myPassword"
                   placeholder="secure password">
          </dd>
        </dl>
        <button class="btn btn-outline">Update</button>
      </form>
    </div>
    <div class="flex flex-between m-3">
      <div></div>
      <div>
        <button class="btn btn-outline" @click="loadFromFile">Load email list from file</button>
        <button class="btn btn-primary" @click="addNewContact">+ New</button>
      </div>
    </div>
    <nav class="menu m-1">
      <div class="p-3 menu-item flex flex-between" v-if="addingContact || computedContacts.length < 1">
        <span>
          Name (optional): <input class="form-control input-block" type="text" v-model="newContact.name">
          Email: <input class="form-control input-block" type="text" v-model="newContact.email">
        </span>
        <span><button class="btn btn-outline" @click="saveContacts">Save</button></span>
      </div>
      <div class="p-3 menu-item flex flex-between" v-for="contact in computedContacts">
        <span>{{ Object.keys(contact).includes('name') ? `${contact.name} - ` : '' }}{{ contact.email }}</span>
        <span><button class="btn btn-sm btn-danger" @click="removeContact(contact)">Remove</button></span>
      </div>
    </nav>
  </div>
</template>

<script>
  const { app, dialog } = require('electron').remote
  const fs = require('fs')
  const Ajv = require('ajv')
  const ajv = new Ajv({allErrors: true})

  export default {
    data: () => ({
      addingContact: false,
      newContact: {
        name: '',
        email: ''
      },
      myEmail: ''
    }),
    created () {
      if (this.$route.query.new) {
        this.addingContact = true
      }
    },
    methods: {
      addNewContact () {
        this.addingContact = true
      },
      saveContacts () {
        if (this.sites === undefined) {
          this.sites = []
        }
        this.$store.commit('SET_CONTACTS', this.computedContacts.concat([this.newContact]))
        this.addingContact = false
      },
      removeContact (site) {
        this.$store.commit('SET_CONTACTS',
          this.computedContacts.filter(function (el) {
            return el !== site
          })
        )
      },
      loadFromFile () {
        const vm = this
        dialog.showOpenDialog({
          defaultPath: `${app.getPath('home')}`,
          filters: [
            {name: 'json', extensions: ['json']}
          ]
        }, function (fileNames) {
          if (fileNames === undefined) return
          const schema = {
            properties: {
              name: { type: 'string' },
              email: { type: 'string' }
            }
          }
          const validate = ajv.compile(schema)
          let fileName = fileNames[0]
          fs.readFile(fileName, 'utf-8', (err, data) => {
            console.log(err)
            data = JSON.parse(data)
            console.log(data)
            const result = function () {
              for (let site of data) {
                if (!validate(site) || !Object.keys(site).includes('name') || !Object.keys(site).includes('email')) {
                  dialog.showMessageBox({
                    type: 'error',
                    message: 'Invalid contact list. Check for valid json. Each contact must have a name and email.'
                  })
                  return 'bogus'
                }
              }
            }
            if (result() !== 'bogus') {
              vm.$store.commit('SET_CONTACTS', data)
            }
          })
        })
      }
    },
    computed: {
      computedContacts () {
        const contacts = this.$store.getters.contacts
        // Reset newContact when it is added to sites
        if (contacts.indexOf(this.newContact) > -1) {
          this.newContact = {name: '', email: ''}
        }
        return contacts
      }
    }
  }
</script>

<style scoped lang="stylus">
  .menu-item
    line-height 34px
</style>
