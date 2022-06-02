import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { CountSelection } from "./CountSelection";
import { DonationDetails } from "./DonationDetails";
import { useMutation } from "urql";

const CreateDonation = `
mutation Mutation($createDonationInput: CreateDonationInput!) {
  createDonation(createDonationInput: $createDonationInput) {
    id
    count
    createAt
  }
}
`;

interface Props {}

export const DonationWizard = (props: Props) => {
  const [step, setStep] = useState(0);
  const [donationDetails, setDonationDtails] = useState({ count: 20 });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donationResult, createDonation] = useMutation(CreateDonation);
  const next = (values: any = {}) => {
    const mergedDetails = { ...donationDetails, ...values };
    if (step === pages.length - 1) {
      submitDonation(mergedDetails);
    } else {
      setStep(step + 1);
      setDonationDtails(mergedDetails);
    }
  };
  const previous = () => {
    setStep(step - 1);
  };
  const submitDonation = async (values: any) => {
    await createDonation({ createDonationInput: values });
    setShowConfirmation(true);
  };
  const pages = [
    <CountSelection next={next} initialCount={donationDetails.count} />,
    <DonationDetails next={next} previous={previous} />,
  ];
  return (
    <Box boxShadow={"xl"} p={8} bg={"white"} borderRadius={"xl"} minW={"sm"}>
      {showConfirmation ? (
        <div>
          Thank you for donation of $
          {donationResult?.data.createDonation?.count}!!
        </div>
      ) : (
        pages[step]
      )}
    </Box>
  );
};
