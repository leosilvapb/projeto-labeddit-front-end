export const goToSignInPage = (navigator) => {
    navigator('/signin')
}
export const goToSignUpPage = (navigator) => {
    navigator('/signup')
}
export const goToPostPage = (navigator, id) => {
    navigator(`/post/${id}`)
}
export const goToFeedPage = (navigator) => {
    navigator('/')
}