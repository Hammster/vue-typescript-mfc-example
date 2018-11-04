import { Vue, Component, Prop } from 'vue-property-decorator'
import View from './app-template.pug?style=./app-style.scss'

@View
@Component
export default class App extends Vue {
    public someVar: number = 0

    public get someVarNicelyFormatted(): string {
        return `🌟${this.someVar}🌟`
    }

    public addOne(): void {
        this.someVar++
    }
}
