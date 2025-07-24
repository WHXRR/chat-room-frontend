import { useContext, useEffect, useRef } from 'react'
import CatImage from '@/assets/images/cat.png'
import { ChatroomContext } from '@/context/ChatroomContext'
import { useNavigate } from 'react-router-dom'
import useStore from '@/store'

export function Header() {
  const chatroomInfo = useContext(ChatroomContext)
  const catContainerRef = useRef<HTMLDivElement>(null)
  const catRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (catContainerRef.current && catRef.current) {
      const containerWidth = catContainerRef.current.offsetWidth
      const catWidth = catRef.current.offsetWidth
      const distance = containerWidth - catWidth
      const speed = 100
      const duration = (distance * 2) / speed

      catRef.current.style.setProperty('--max-move', `${distance}px`)
      catRef.current.style.setProperty('--walk-duration', `${duration}s`)
    }
  }, [chatroomInfo])

  const navigate = useNavigate()
  const { clearMessageList } = useStore()
  const goHome = () => {
    clearMessageList()
    navigate('/home')
  }

  return (
    <div className="flex justify-between items-center">
      <div className="text-xl font-bold py-2">{chatroomInfo?.name}</div>
      <div
        className="flex-1 mx-4 overflow-hidden self-end"
        ref={catContainerRef}
      >
        <img
          src={CatImage}
          alt="cat"
          className="w-10 md:w-20 cat"
          ref={catRef}
        />
      </div>
      <svg
        className="w-6 cursor-pointer text-[#6a676b] hover:text-[#ef857d] transition-all"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5008"
        fill="currentColor"
        onClick={goHome}
      >
        <path
          d="M96 395.52V896a64 64 0 0 0 64 64h704a64 64 0 0 0 64-64V395.52a64 64 0 0 0-26.688-52.032l-352-252.672a64 64 0 0 0-74.624 0l-352 252.672a64 64 0 0 0-26.688 52.032z"
          p-id="5009"
        ></path>
        <path
          d="M672 704a32 32 0 0 1-7.36 20.416q-29.248 35.328-67.648 54.912Q556.544 800 512 800q-44.544 0-84.992-20.672-38.4-19.584-67.648-54.912a32 32 0 1 1 49.28-40.832q20.864 25.152 47.424 38.72 26.816 13.696 55.936 13.696t55.936-13.696q26.56-13.568 47.424-38.72A32 32 0 0 1 672 704z"
          fill="#FFFFFF"
          p-id="5010"
        ></path>
      </svg>
    </div>
  )
}
