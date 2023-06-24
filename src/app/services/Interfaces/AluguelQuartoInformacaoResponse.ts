export interface AluguelQuartoInformacaoResponse {
    id: number
    start: string
    end: string
    room: Room
    clientId:number
  }
  
  export interface Room {
    id: number
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