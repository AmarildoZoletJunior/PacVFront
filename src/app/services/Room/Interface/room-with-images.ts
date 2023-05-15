export interface RoomResponseWithImage {
  id:number
  available: boolean
  level: number
  name: string
  description: string
  number: number
  images: Image[]
}

export interface Image {
  id: number
  imageBase: string
  formatImage: string
  roomId: number
}