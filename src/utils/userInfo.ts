export function userLoggedIn(): boolean {
  return Date.now() < localStorage.getItem("currentTokenExpires") * 1000;
}

export function getUserId(): number {
  return JSON.parse(localStorage.getItem("currentUser")).id;
}

export function userLogOut(): void {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentToken");
  localStorage.removeItem("currentTokenExpires");
}
