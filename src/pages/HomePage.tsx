import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  text-decoration: none;
  color: white;
  background-color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px;
  display: inline-block;
  cursor: pointer;
`;

const HomePage = () => {
  return (
    <Container>
      <h1>Homepage</h1>
      <nav>
        <UL>
          <Li>
            <Link to='/task-list'>Task List</Link>
          </Li>
          <Li>
            <Link to='/pagination'>Pagination</Link>
          </Li>
        </UL>
      </nav>
    </Container>
  );
};

export default HomePage;
