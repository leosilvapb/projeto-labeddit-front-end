import { BackIcon, HeaderStyled, LinkText, LogoHeader, UserName } from "./style";
import logo from "../../assets/logo.png";
import backIcon from "../../assets/backIcon.png";
import { useNavigate } from "react-router-dom";
import { goToSignInPage } from "../../routes/coordinator";
import { goToFeedPage } from "../../routes/coordinator";

export const Header = ({ currentPage }) => {
  const navigator = useNavigate();
  const logout = () => {
    localStorage.removeItem("tokenLabeddit");
    localStorage.removeItem("userName");
    goToSignInPage(navigator);
  };
  return (
    <HeaderStyled>
      <LogoHeader src={logo} />
      {currentPage === "post" ? (
        <BackIcon onClick={() => goToFeedPage(navigator)} src={backIcon} />
      ) : (
        <div></div>
      )}
      {currentPage === "signup" ? (
        <LinkText onClick={() => goToSignInPage(navigator)}>Entrar</LinkText>
      ) : (
        <>
        <LinkText onClick={logout}>Logout</LinkText>
        <UserName page={currentPage} >{localStorage.getItem("userName")}</UserName>
        </>
      )}
    </HeaderStyled>
  );
};
