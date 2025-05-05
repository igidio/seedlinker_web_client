import Cookies from 'js-cookie'

export const set_cookie = (name: string, token: string) => {
  Cookies.set(name, token, { expires: 60000 })
}

export const get_cookie = (name: string) => {
  return Cookies.get(name)
}

export const remove_cookie = (name: string) => {
  Cookies.remove(name)
}
