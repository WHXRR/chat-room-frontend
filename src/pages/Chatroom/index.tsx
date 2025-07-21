import { Container } from './Container'
import { Header } from './Header'
import { Tools } from './Tools'
import { Config } from './Config'

export default function Chatroom() {
  return (
    <div className="flex h-full">
      <div className="w-[50px] hidden md:block border-r border-gray-200">
        <Tools />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 p-2">
          <Header />
        </div>
        <div className="flex flex-1">
          <div className="flex-1">
            <Container />
          </div>
          <div className="w-[250px] p-2 hidden md:block border-l border-gray-200">
            <Config />
          </div>
        </div>
      </div>
    </div>
  )
}
