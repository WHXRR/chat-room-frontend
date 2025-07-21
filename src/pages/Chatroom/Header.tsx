import { Avatar } from "@/components/Avatar";

export function Header() {
  return <div className="flex items-center justify-between">
    <div className="text-xl font-bold">测试群聊</div>
    <div className="flex items-center cursor-pointer">
      <Avatar headPic="zangao" className="w-7" />
      <div className="pl-2">test1</div>
    </div>
  </div>
}