import { Vue, Component, Prop } from 'vue-property-decorator'
import Template from './app.pug?style=./app.scss'

/**
 * The Decorators combines your class with the render function build from your imported template
 */

@Template
@Component
export default class App extends Vue {
  @Prop({ default: 'With TypeScript, Pug and SCSS' }) readonly message!: string
}
