import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import {
  Button,
  Stack,
  Box,
  Flex,
  Heading,
  Center,
  Text,
  Spacer,
  Fade,
  useDisclosure,
  Select,
  Container,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { BFSRequire, configure } from "browserfs";
import DropzoneField from "../components/dropzone";
import DragDrop from "../components/DragDrop";
import { promisifyAll } from "bluebird";
import DonationModal from "../components/DonationModal";
import {
  readFileAsync,
  runWasm,
  downloadAndZipFolder,
} from "../components/Helper";
import FeatureBlock from "../components/FeatureBlock";
import { NextSeo } from "next-seo";
let fs;
let Buffer;

const Extract = () => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [files, setFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mode, setMode] = useState("");
  const init = useCallback(async () => {
    configure(
      {
        fs: "InMemory",
      },
      function (e) {
        if (e) {
          // An error happened!
          throw e;
        }
        fs = promisifyAll(BFSRequire("fs"));

        Buffer = BFSRequire("buffer").Buffer;
        global.fs = fs;
        global.Buffer = Buffer;
        const script = document.createElement("script");

        script.src = "wasm_exec.js";
        script.async = true;

        document.body.appendChild(script);
      }
    );
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const extractFiles = async () => {
    setIsExtracting(true);
    await startExtractingFiles();
    setIsExtracting(false);
    onOpen();
  };

  const selectedValues = async (target) => {
    setMode(target);
  };

  const startExtractingFiles = async () => {
    const toastId = toast.loading(`Loading File ${files[0].path}`);
    for (let i in files) {
      //merge first two files into merge.pdf
      try {
        await readFileAsync(files[i], files, setFiles);
      } catch (error) {
        console.log(error);
        toast.error("There was an error loading your PDFs", {
          id: toastId,
        });
      }
      await fs.mkdirAsync("./" + mode);

      let exitcode = await runWasm([
        "pdfcpu.wasm",
        "extract",
        "-m",
        mode,
        "-c",
        "disable",
        files[i].path,
        "./" + mode,
      ]);

      if (exitcode !== 0) {
        toast.error("There was an error extracting Files from your PDFs", {
          id: toastId,
        });
        return;
      }
      await fs.unlinkAsync(files[i].path);
      await downloadAndZipFolder(fs, mode, files[i].name);
    }
    toast.success("Your File(s) is Ready!", {
      id: toastId,
    });
    setFiles([]);
    return;
  };

  const LoadingButton = () => {
    if (isExtracting) {
      return (
        <>
          <Button
            colorScheme="blue"
            isLoading
            disabled={isExtracting}
            variant="outline"
          >
            خروجی گرفتن
          </Button>
        </>
      );
    } else {
      return (
        <Button
          colorScheme="blue"
          variant="outline"
          disabled={isExtracting || mode == "" || files.length == 0}
          onClick={extractFiles}
        >
          خروجی گرفتن
        </Button>
      );
    }
  };
  const modeText = () => {
    if (mode == "") {
      return (
        <Text color={"gray.500"} px={[1, 10, 15]} pb={6}>
        </Text>
      );
    } else if (mode == "image") {
      return (
        <Text color={"gray.500"} px={[1, 10, 15]} pb={6}>
        </Text>
      );
    } else if (mode == "meta") {
      return (
        <Text color={"gray.500"} px={[1, 10, 15]} pb={6}>
        </Text>
      );
    } else if (mode == "content") {
      return (
        <Text color={"gray.500"} px={[1, 10, 15]} pb={6}>
        </Text>
      );
    } else if (mode == "pages") {
      return (
        <Text color={"gray.500"} px={[1, 10, 15]} pb={6}>
        </Text>
      );
    } else if (mode == "font") {
      return (
        <Text color={"gray.500"} px={[1, 10, 15]} pb={6}>
        </Text>
      );
    }
  };

  return (
    <>

      <Flex width="full" height="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth={["100%", "95%", "70%", "50%"]}
          width={["100%", "95%", "70%", "50%"]}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          backgroundColor="white"
        >
          <Center>
            <FeatureBlock
              title={"خروجی گرفتن از اطلاعات"}
            />
          </Center>
          {modeText()}
          <DropzoneField setFiles={setFiles} files={files}></DropzoneField>
          <Toaster />
          <DonationModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          ></DonationModal>
          <aside>
            <Fade in={files.length !== 0} reverse>
              <Stack spacing={8} m={3}>
                <div className={`${files.length > 3 ? "customList" : ""}`}>
                  <DragDrop
                    setState={setFiles}
                    state={files}
                    isMerging={isExtracting}
                  ></DragDrop>
                </div>
              </Stack>
            </Fade>
          </aside>
          <Text
            fontSize="xs"
            m={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            {files.length === 0 ? "" : "می‌توانید فایل‌ها را برای مرتب‌سازی بکشید و رها کنید"}
          </Text>
          <Flex row={2}>
            <Container maxW="sm">
              <Select
                onChange={(e) => selectedValues(e.target.value)}
                colorScheme="blue"
                placeholder="انواع خروجی"
                variant="outline"
              >
                <option value="image">خروجی گرفتن تمام عکس ها</option>
                <option value="meta">META DATA خروجی گرفتن</option>
                <option value="content">خروجی گرفتن نوشته ها</option>
                <option value="page">خروجی گرفتن صفحات</option>
                <option value="font">خروجی گرفتن فونت ها</option>
              </Select>
            </Container>
            <Spacer />
            <LoadingButton />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Extract;
