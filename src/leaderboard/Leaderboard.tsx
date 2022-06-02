import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { LeaderboardItem } from "./LeaderboardItem";
import { useState } from "react";
import { Donation } from "../types";
import { useQuery } from "urql";

const DonationsQuery = `
    query Query($orderBy: OrderByParams) {
      donations(orderBy: $orderBy) {
        id
        count
        displayName
        team
        message
        createAt
      }
    }
`;
type DonationsQueryRes = {
  donations: Donation[];
};

interface Props {}

export const Leaderboard = (props: Props) => {
  const [field, setOrderByField] = useState("createAt");
  const [{ data, fetching, error }] = useQuery<DonationsQueryRes>({
    query: DonationsQuery,
    variables: {
      orderBy: {
        field,
        direction: "desc",
      },
    },
  });
  if (error) return <p>Something went wrong...</p>;
  if (fetching || !data) return <p>Loading...</p>;
  return (
    <Box w={"100%"}>
      <Heading>LEADERBOARD</Heading>
      <RadioGroup onChange={setOrderByField} value={field}>
        <Stack direction={"row"}>
          <Radio value={"createAt"}>Most Recent</Radio>
          <Radio value={"count"}>Most Pounds</Radio>
        </Stack>
      </RadioGroup>
      <VStack spacing={4}>
        {data.donations.map((donation) => (
          <LeaderboardItem donation={donation} />
        ))}
      </VStack>
    </Box>
  );
};
