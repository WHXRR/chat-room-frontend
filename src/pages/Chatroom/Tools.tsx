import BlogImage from '@/assets/images/blog.png'
import MusicImage from '@/assets/images/music-icon.png'

export function Tools() {
  return (
    <div className="space-y-3">
      <a
        href="http://whxrr.top/"
        target="_blank"
        title="念白集"
        className="block"
      >
        <img src={BlogImage} alt="blog" />
      </a>
      <a
        href="https://whxrr.github.io/CloudMusic/#/discover/recommend"
        target="_blank"
        title="云音乐"
        className="block"
      >
        <img src={MusicImage} alt="cloudMusic" />
      </a>
    </div>
  )
}
