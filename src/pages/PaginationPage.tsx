import styled from "styled-components";
import Pagination from "../components/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

const PAGE_SIZE = 10;
const totalItems = items.length;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e0e0e0;
  border: 1px solid white;
  border-radius: 5px;
  color: black;
  margin: 10px 0;
  padding: 10px;
`;

const PaginationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const pageNumber = page ? parseInt(page) : 1;

  const currentItems = items.slice(
    PAGE_SIZE * (pageNumber - 1),
    PAGE_SIZE * pageNumber
  );

  return (
    <Container>
      <ul>
        {currentItems.map((i) => (
          <TaskItem key={i}>{i}</TaskItem>
        ))}
      </ul>
      <Pagination
        totalItems={totalItems}
        pageSize={PAGE_SIZE}
        onChange={(pgNumber) => {
          navigate(`?page=${pgNumber}`);
        }}
        currentPage={pageNumber}
      />
    </Container>
  );
};

export default PaginationPage;
