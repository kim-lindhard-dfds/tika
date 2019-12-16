export default class ServiceAccount {
  Id: number;
  Name: string;
  Description: string; // Currently isn't parsed properly (whitespace and space in general gets trimemd away)
}
