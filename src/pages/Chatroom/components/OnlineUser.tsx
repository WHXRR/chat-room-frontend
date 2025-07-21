const images = import.meta.glob('@/assets/images/avatar/*.svg', {
  eager: true,
  import: 'default',
});

export function OnlineUser() {

  const users = [
    {
      username: 'test1test1',
      headPic: 'baimao'
    },
    {
      username: 'test2',
      headPic: 'bianmu'
    },
    {
      username: 'test3',
      headPic: 'buoumao'
    },
    {
      username: 'test3',
      headPic: 'buoumao'
    },
    {
      username: 'test3',
      headPic: 'buoumao'
    },
    {
      username: 'test3',
      headPic: 'buoumao'
    },
    {
      username: 'test3',
      headPic: 'buoumao'
    },
    {
      username: 'test3',
      headPic: 'buoumao'
    },
  ]

  return <div className="grid grid-cols-4 gap-3">
    {
      users.map((item, index) => {
        const imgSrc = images[`/src/assets/images/avatar/${item.headPic}.svg`] as string;
        return <div className="text-xs text-center" title={item.username}>
          <img key={index} src={imgSrc} alt={item.headPic} className="w-7 mx-auto" />
          <div className="pt-0.5 relative px-2">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 mt-0.5 bg-green-500 rounded-full"></div>
            <div className="overflow-hidden text-ellipsis flex-1 leading-none">{item.username}</div>
          </div>
        </div>;
      })
    }
  </div>
}