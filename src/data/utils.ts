// Deterministic seeded random so mock data is stable across renders/builds.
let seed = 42
export function rand() {
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}
export function randInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min
}
export function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)]
}
export function pickMany<T>(arr: T[], n: number): T[] {
  const copy = [...arr]
  const out: T[] = []
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(randInt(0, copy.length - 1), 1)[0])
  }
  return out
}
export const firstNames = [
  'Aarav','Vivaan','Aditya','Vihaan','Arjun','Sai','Reyansh','Krishna','Ishaan','Kabir',
  'Ananya','Diya','Saanvi','Myra','Aadhya','Kiara','Riya','Pihu','Anika','Navya',
  'Rohan','Karan','Nikhil','Yash','Dev','Aryan','Rahul','Varun','Sameer','Omkar',
  'Priya','Sneha','Neha','Pooja','Isha','Meera','Tanya','Naina','Aisha','Zara',
]
export const lastNames = [
  'Sharma','Verma','Gupta','Mehta','Shah','Patel','Iyer','Nair','Rao','Reddy',
  'Kapoor','Malhotra','Bhatt','Chopra','Joshi','Desai','Kulkarni','Menon','Bose','Saxena',
]
export function fullName() {
  return `${pick(firstNames)} ${pick(lastNames)}`
}
export function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}
export function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}
export function daysFromNow(n: number) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d
}
export function fmtDate(d: Date) {
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
