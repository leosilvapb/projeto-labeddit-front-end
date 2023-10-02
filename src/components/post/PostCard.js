import {
  CommentsNumber,
  Container,
  LikesDiv,
  LikesNumber,
  OwnerName,
  PostContent,
  LikeIcon,
  DislikeIcon,
  ReactionsDiv,
  CommentIcon,
} from "./style";
import likeIcon from "../../assets/likeIcon.png";
import likeIconRed from "../../assets/likeIconRed.png";
import likeIconGreen from "../../assets/likeIconGreen.png";

import dislikeIcon from "../../assets/dislikeIcon.png";
import commentIcon from "../../assets/commentIcon.png";
import { useNavigate } from "react-router-dom";
import { goToPostPage } from "../../routes/coordinator";
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";

export const PostCard = ({ post, like, deleteCard, editContent }) => {
  const { id, creator, content, likes, dislikes, comments, reaction } = post;
  const [editing, setEditing] = useState(false);
  const sendEdit = (e) => {
    e.preventDefault();
    editContent(isComment, id, form.newContent);
    setEditing(!editing);
  }
  const navigator = useNavigate();
  const isComment = comments === undefined ? true : false;
  const [form, onChangeInputs, clearInputs] = useForm({
    email: "",
    password: "",
  });

  return (
    <Container>
      <Flex width="100%" direction="row" justify="space-between">
        <OwnerName>Enviado por: {creator.name} </OwnerName>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<GiHamburgerMenu />}
            variant="outline"
            border="none"
            height="12px"
          />
          <MenuList>
            <MenuItem icon={<BiEdit />} onClick={() => setEditing(!editing)}>
              Editar conteúdo
            </MenuItem>
            <MenuItem
              icon={<RiDeleteBin6Line />}
              onClick={() => deleteCard(isComment, id)}
            >
              Excluir
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {editing ? (
        <form onSubmit={sendEdit} width='100%'>
          <Flex direction="column" align="flex-start" gap="4px">
            <Editable defaultValue={content}>
              <EditablePreview bg="yellow.500" maxWidth="260px" />
              <EditableInput
                bg="yellow.500"
                width="260px"
                height="80px"
                name="newContent"
                onChange={onChangeInputs}
              />
            </Editable>
            <Button type="submit">Enviar</Button>
          </Flex>
        </form>
      ) : (
        <PostContent>{content}</PostContent>
      )}

      <ReactionsDiv>
        <LikesDiv>
          {reaction === true ?
            <LikeIcon
              onClick={() => like(isComment, id, true)}
              src={likeIconGreen}
              reaction={reaction}
            /> :
            <LikeIcon
              onClick={() => like(isComment, id, true)}
              src={likeIcon}
              reaction={reaction}
            />}
          <LikesNumber>{likes - dislikes}</LikesNumber>
          {reaction === false ?
            <DislikeIcon
              onClick={() => like(isComment, id, false)}
              src={likeIconRed}
            /> :
            <DislikeIcon
              onClick={() => like(isComment, id, false)}
              src={dislikeIcon}
              reaction={reaction}
            />}
        </LikesDiv>
        {!isComment ? (
          <LikesDiv onClick={() => goToPostPage(navigator, id)}>
            <CommentIcon src={commentIcon} />
            <CommentsNumber>{comments}</CommentsNumber>
          </LikesDiv>
        ) : undefined}
      </ReactionsDiv>
    </Container>
  );
};
