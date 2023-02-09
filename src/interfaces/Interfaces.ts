export interface Show {
  movieID: String | undefined;
  moviePoster: String | undefined;
  movieName: String | undefined;
  showID: number | undefined;
  roomID: string | undefined;
  room?: Room | undefined;
  dateTime: Date | null;
  startDateTime?: Date | undefined;
  endDateTime?: Date | undefined;
  additionalInfo: {
    isThreeD: boolean;
    hasDolbyAtmos: boolean;
  }
  seatingPlan?: any;
  movie?: Movie
}

export interface ShowWithMovieObject {
  id: number | undefined;
  endDdateTime: Date | null;
  startDateTime: Date | null;
  duration: number | undefined;
  isThreeD: boolean;
  isDolbyAtmos: boolean;
  movie: Movie;
  room: {
    id: number;
    name: string;
    hasThreeD: boolean;
    hasDolbyAtmos: boolean;
  }
  status: string | undefined;
}

export interface ShowDate {
  date: Date
  shows: Array<Show>
}

export interface TrailerType {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  official: boolean
  published_at: string
  site: string
  size: number
  type: string
}

export interface OMDbMovie {
  id?: number | string | undefined,
  imdbID?: String | undefined
  Title?: String | undefined,
  Poster?: string | undefined,
  Runtime?: String | undefined,
  Writer?: String | undefined,
  Actors?: String | undefined,
  Genre?: String | undefined,
  Rated?: String | undefined,
  Plot?: String | undefined,
  Year?: String | undefined,
  Director?: String | undefined,
  imdbRating?: String | undefined,
  imdbVotes?: String | undefined,
  trailer: TrailerType | undefined,
}

export interface Movie {
  id?: number | string | undefined,
  imdbId?: String | undefined
  title?: String | undefined,
  posterImage?: string | undefined,
  runtime?: string | undefined,
  writer?: String | undefined,
  director?: String | undefined,
  actors?: String | undefined,
  genre?: String | undefined,
  rated?: String | undefined,
  plot?: String | undefined,
  releaseYear?: String | undefined,
  imdbRating?: String | undefined,
  imdbRatingCount?: String | undefined,
  movieStatus?: String | undefined,
  imdbVotes?: String | undefined,
  trailer: TrailerType | undefined,
}


export interface Seat {
  id: number | null;
  category: String;
  row: number;
  column: number;
}

export interface ShowSeat {
  seat: Seat;
  reserved: boolean;
  selected: boolean;
}

export interface ShowRow {
  rowDescription: String;
  seats: Array<ShowSeat>;
}

export interface Row {
  rowDescription: string;
  seats: Array<Seat>;
}

export interface Reservation {
  id: number;
  screeningId: number;
  orderId: number;
  seat: Seat;
  category: string;
  expiresAt: Date;
}

export interface Ticket {
  id: number;
  orderId: number;
  screening: Show;
  seat: Seat;
  category: string
}

export interface fareSelection {
  id: number;
  name: string;
  price: number;
  fareCondition: string;
  amountOfTickets: number;
}

export interface SimpleFare {
  name: string,
  ammount: number
}

export interface fareInput {
  name: string;
  price: number;
  fareCondition: string;
}

export interface Room {
  id: number;
  name: string;
  hasThreeD: boolean;
  hasDolbyAtmos: boolean;
  rows: Array<Row>;
}

export interface NewRoom {
  name: string;
  hasThreeD: boolean;
  hasDolbyAtmos: boolean;
  numberOfRows: number;
  numberOfColumns: number;
}

export interface ShowRoom {
  id: number;
  name: string;
  hasThreeD: boolean;
  hasDolbyAtmos: boolean;
  rows: Array<ShowRow>;
}

export interface User {
  id: number | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  street: string | undefined,
  houseNumber: string | undefined,
  zip: string | undefined,
  city: string | undefined,
  email: string | undefined,
  password: string | undefined,
  matchingPassword: string | undefined,
}

export interface Order {
  id?: number | undefined;
  user?: User | undefined;
  orderStatus?: string | undefined;
  total?: | undefined;
  reservations?: Array<Reservation> | undefined;
  tickets?: Array<Ticket> | undefined;
  seats: Array<Row> | undefined;
  fares: Array<SimpleFare> | undefined;
  price?: number | undefined;
  paymentMethod: string | undefined;
  faresSelected?: any | undefined;
  expiresAt?: string | undefined;
}

export interface AdminProps {
  isAdmin: boolean;
}

export interface AdminPropsChange {
  isAdmin: boolean;
  handleChangeAdminMode: Function;
}