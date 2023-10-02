import {Routes, BrowserRouter, Route} from 'react-router-dom'
import {SignInPage} from '../pages/sign-in/SignInPage'
import {SignUpPage} from '../pages/sign-up/SignUpPage'
import {PostPage} from '../pages/post/PostPage'
import {FeedPage} from '../pages/feed/FeedPage'

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/signin' element={<SignInPage/>}/>
                <Route path='/signup' element={<SignUpPage/>}/>
                <Route path='/post/:id' element={<PostPage/>}/>
                <Route path='/' element={<FeedPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}