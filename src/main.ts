import { createApp, h} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import feather from 'vue-icon';


const app = createApp(App);

app.use(feather, {
    name: 'v-icon',
    data(){
        return {
            baseClass: 'v-icon',
            classPrefix: 'v-icon-'
        }
    }
})

app
    .use(store)
    .use(router)
    .mount("#app")