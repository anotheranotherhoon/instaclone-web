import styled from "styled-components";

const SSeparator = styled.div`
  margin: 20px 0px 30px 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 110px;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

function Separator() {
	return (
		<SSeparator>
			<div></div>
			<span>또는</span>
			<div></div>
		</SSeparator>
	)
}

export default Separator;