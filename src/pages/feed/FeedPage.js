import {
  Button,
  Flex,
  Image,
  Input,
  StackDivider,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Header } from "../../components/header/Header";
import { PostCard } from "../../components/post/PostCard";
import { useEffect, useState } from "react";
import { createPost, getPosts } from "../../apiRequest/apiRequest";
import { useForm } from "../../hooks/useForm";
import { FormStyled } from "./style";
import { deleteItem, editItem, like } from "../../apiRequest/cardFunctions";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { goToSignInPage } from "../../routes/coordinator";
import loadingGif from '../../assets/loading.gif'

export const FeedPage = () => {
  const navigator = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("tokenLabeddit")) {
      goToSignInPage(navigator)
    }
  }, [])

  const [postsList, setPostsList] = useState();
  const currentPage = "feed";
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [form, onChangeInputs, clearInputs] = useForm({
    content: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const likePostPage = async (isComment, id, value) => {
    await like(isComment, id, value, setMessage, onOpen);
  };

  const deleteFeedCard = async (isComment, id) => {
    await deleteItem(isComment, id, setMessage, onOpen);
  };

  const editContentFeed = async (isComment, id, newContent) => {
    await editItem(isComment, id, newContent, setMessage, onOpen);
  };

  const requestPosts = async (token) => {
    try {
      const response = await getPosts(token);
      setPostsList(response);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };
  const onSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const response = await createPost(localStorage.getItem("tokenLabeddit"), {
        content: form.content,
      });
      setMessage(response.message);
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
    requestPosts(localStorage.getItem("tokenLabeddit"));
  }, [postsList, message]);

  return (
    <Flex direction="column" justify="flex-start" height="100vh">
      <Header currentPage={currentPage} />
      <Flex flex="1" direction="column" justify="space-between" padding="28px">
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
          <ModalOverlay />
          <ModalContent borderRadius="60px">
            <ModalBody
              color="white"
              fontWeight="700"
              bgGradient="linear(to-r, pink.500, orange.500)"
              borderRadius="60px"
              borderWidth="1px"
            >
              {message}
            </ModalBody>
          </ModalContent>
        </Modal>
        <VStack gap="18px" divider={<StackDivider borderColor="orange.500" />}>
          <FormStyled onSubmit={onSubmit}>
            <Flex
              direction="column"
              justify="flex-start"
              width="100%"
              gap="12px"
            >
              <Textarea
                value={form.content}
                type="text"
                name="content"
                onChange={onChangeInputs}
                fontSize="16px"
                height="131px"
                borderRadius="12px"
                placeholder="Escreva seu post..."
                bg="gray.500"
                _placeholder={{ color: "inherit", fontSize: "16px" }}
              ></Textarea>
              <Button type="submit" variant="gradient" transition='0.6s' _active={{ bg: "gray.100" }} _hover={{ bg: "gray.100" }}>
                Postar
              </Button>
            </Flex>
          </FormStyled>
          <Flex direction="column" justify="flex-start" width="100%" gap="12px">
            <Input
              placeholder="Pesquisar por nome"
              _placeholder={{ color: "gray.700" }}
              value={search}
              onChange={handleSearch}
            ></Input>
            {!isLoading && postsList !== undefined
              ? postsList
                .filter((post) => post.creator.name.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => { return ((b.likes - b.dislikes) - (a.likes - a.dislikes)) })
                .map((post) => {
                  return (
                    <PostCard
                      key={post.id}
                      post={post}
                      like={likePostPage}
                      deleteCard={deleteFeedCard}
                      editContent={editContentFeed}
                    />
                  );
                })
              : <Image maxWidth='200px' alignSelf="center" src={loadingGif} alt="Carregando..." />}
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};
