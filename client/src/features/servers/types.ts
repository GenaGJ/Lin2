

export type Server = {
  id: number;
  address:string
  name:string
  desc:string
  rating:string
  chronicles:string
  openAt:string |Date
  destroyAt:string
  
};

export type ServerId = Server['id']

export type ServerWhisOutId = Omit<Server, 'id'>

export type FilterParams = {
  key: string
  stro:string|undefined
  value:string
}



export type ServerState = {
  servers:Server[] 
   filteredServers:Server[],
   filterParams: FilterParams,
  error:string | undefined,
  loading:boolean,
  selectedLanguage: string,

  
}


