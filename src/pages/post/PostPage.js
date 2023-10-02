import { Button, Flex, Image, Input, StackDivider, Textarea, VStack, useDisclosure } from "@chakra-ui/react";
import { Header } from "../../components/header/Header";
import { PostCard } from "../../components/post/PostCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createComment, getCommentsByPostId, getPostById } from "../../apiRequest/apiRequest";
import { useForm } from "../../hooks/useForm";
import { FormStyled } from "../feed/style";
import { deleteItem, like, editItem } from "../../apiRequest/cardFunctions";
import { goToFeedPage, goToSignInPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react'
import loadingGif from '../../assets/loading.gif'

export const PostPage = () => {

  const navigator = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("tokenLabeddit")) {
      goToSignInPage(navigator)
    }
  }, [])
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("");
  const [post, setPost] = useState("");
  const [commentsList, setCommentsList] = useState();

  const [message, setMessage] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const likePostPage = async (isComment, id, value) => {
    await like(isComment, id, value, setMessage, onOpen)
  }

  const deletePostPageCard = async (isComment, id) => {
    await deleteItem(isComment, id, setMessage, onOpen)
  }

  const editContentPostPage = async (isComment, id, newContent) => {
    await editItem(
      isComment,
      id,
      newContent,
      setMessage,
      onOpen
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [form, onChangeInputs, clearInputs] = useForm({
    content: ""
  });

  const requestPost = async (token, id) => {
    setIsLoading(true)
    try {
      const response = await getPostById(token, id);
      setPost(response);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setMessage(error.response.data)
      goToFeedPage(navigator)
      setIsLoading(false)
    }
  };

  const requestComments = async (token, id) => {
    setIsLoading(true)
    try {
      const response = await getCommentsByPostId(token, id);
      setCommentsList(response);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setMessage(error.response.data)
      setIsLoading(false)
    }
  };

  const onSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const response = await createComment(localStorage.getItem("tokenLabeddit"), {
        content: form.content,
      }, id);
      setMessage(response.message)
      clearInputs();
      setIsLoading(false)
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data);
      setIsLoading(false)
    }
    onOpen();
  };


  useEffect(() => {
    requestPost(localStorage.getItem("tokenLabeddit"), id);
  }, [message]);

  useEffect(() => {
    requestComments(localStorage.getItem("tokenLabeddit"), id);
  }, [message]);

  const currentPage = "post";

  return (
    <Flex direction="column" justify="flex-start" height="100vh">
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='xs'>
        <ModalOverlay />
        <ModalContent borderRadius='60px'>
          <ModalBody color='white' fontWeight='700' bgGradient='linear(to-r, pink.500, orange.500)' borderRadius='60px' borderWidth='1px'>
            {message}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Header currentPage={currentPage} />
      <Flex
        flex="1"
        direction="column"
        justify="flex-start"
        padding="28px"
        gap="12px"
      >

        {!isLoading && post !== "" ? <PostCard post={post} like={likePostPage} deleteCard={deletePostPageCard} editContent={editContentPostPage} /> : <Image maxWidth='200px' alignSelf="center" src={loadingGif} alt="Carregando..." />}
        <VStack gap="18px" divider={<StackDivider borderColor="orange.500" />}>
          <FormStyled onSubmit={onSubmit}>
            <Flex direction="column" justify="flex-start" width="100%" gap="12px">
              <Textarea
                value={form.content}
                type="text"
                name="content"
                onChange={onChangeInputs}
                fontSize="16px"
                height="131px"
                borderRadius="12px"
                placeholder="Adicionar comentário"
                bg="gray.500"
                _placeholder={{ color: "inherit", fontSize: "16px" }}
              ></Textarea>
              <Button type="submit" variant="gradient" transition='0.6s' _active={{ bg: "blue.500" }} _hover={{ bg: "blue.500" }}>Responder</Button>
            </Flex>
          </FormStyled>
          <Flex direction="column" justify="flex-start" width="100%" gap="12px">
            <Input
              placeholder="Pesquisar por nome"
              _placeholder={{ color: "gray.700" }}
              value={search}
              onChange={handleSearch}
            ></Input>
            {!isLoading && commentsList !== undefined ?
              commentsList
                .filter((comment) => comment.creator.name.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => { return ((b.likes - b.dislikes) - (a.likes - a.dislikes)) })
                .map((comment) => {
                  return (
                    <PostCard
                      key={comment.id}
                      post={comment}
                      like={likePostPage}
                      deleteCard={deletePostPageCard}
                      editContent={editContentPostPage}
                    />
                  );
                }) : <Image maxWidth='200px' alignSelf="center" src={loadingGif} alt="Carregando..." />}
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};
