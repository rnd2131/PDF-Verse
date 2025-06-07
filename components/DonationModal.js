import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  VStack,
  Text,
  Progress,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DonationButton from "./DonationButton";

const DonationModal = ({ isOpen, onOpen, onClose }) => {
  const [donations, setDonations] = useState(0);

  useEffect(() => {
    fetch("/api/payment")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDonations(data.total);
      });
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>با تشکر از رادمان</ModalHeader>
          <VStack>
          </VStack>

          <ModalFooter>
            <Button variant="outline" mr={2} onClick={onClose}>
              پایان
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default DonationModal;
