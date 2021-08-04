import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SingUp() {
	const history = useHistory();
	const onCompleted = (data) => {
		const { username, password } = getValues()
		const {
			createAccount: { ok },
		} = data;
		if (!ok) {
			return;
		}
		history.push(routes.home, {
			message: "계정이 생성되었습니다. 다시 로그인해주세요",
			username,
			password,
		});
	};
	const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
		onCompleted,
	});
	const { register, handleSubmit, formState, getValues } = useForm({
		mode: "onChange",
	});
	const onSubmitValid = (data) => {
		if (loading) {
			return;
		}
		createAccount({
			variables: {
				...data,
			},
		});
	};
	return (
		<AuthLayout>
			<PageTitle title="Sign up" />
			<FormBox>
				<HeaderContainer>
					<FontAwesomeIcon icon={faInstagram} size="3x" />
					<Subtitle>
						친구들의 사진과 동영상을 보려면 가입하세요.
          </Subtitle>
				</HeaderContainer>
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<Input
						{...register(
							"firstName", {
							required: "이름을 입력해주세요",
						})}
						type="text"
						placeholder="이름"
						name="firstName"
					/>
					<Input
						{...register(
							"lastName")}
						type="text"
						placeholder="성"
						name="lastName"
					/>
					<Input
						{...register(
							"email", {
							required: "이메일을 입력해주세요",
						})}
						name="email"
						type="text"
						placeholder="이메일"
					/>
					<Input
						{...register(
							"username", {
							required: "사용자 이름을 입력해주세요",
						})}
						name="username"
						type="text"
						placeholder="사용자이름"
					/>
					<Input
						{...register(
							"password", {
							required: "비밀번호를 입력해주세요",
						})}
						name="password"
						type="password"
						placeholder="비밀번호"
					/>
					<Button
						type="submit"
						value={loading ? "Loading..." : "가입"}
						disabled={!formState.isValid || loading}
					/>
				</form>
			</FormBox>
			<BottomBox cta="계정이 있으신가요?" linkText="로그인" link={routes.home} />
		</AuthLayout>
	);
}
export default SingUp;