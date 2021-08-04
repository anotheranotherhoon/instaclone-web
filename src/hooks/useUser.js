import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
			id
      username
      avatar
    }
  }
`;

function useUser() {
	const hasToken = useReactiveVar(isLoggedInVar);
	const { data } = useQuery(ME_QUERY, {
		skip: !hasToken,
	});
	//token을 조작해서 로그인 하려는 경우 로그아웃시킴
	useEffect(() => {
		if (data?.me === null) {
			logUserOut();
		}
	}, [data])
	return { data };
}
export default useUser;