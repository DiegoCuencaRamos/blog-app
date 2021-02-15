import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import dotenv from 'dotenv'

configure({ adapter: new Adapter() })
dotenv.config({ path: '.env.test' })