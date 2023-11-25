import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")}
  background-color: #000;
  pointer-events: ${(props) => (props.disabled ? "none" : null)};
  outline: lightBlue;
  :hover {
    background-color: #e0e0e0;
  }
`;

const Pagination = ({ totalItems, pageSize, onChange, currentPage }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const setPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onChange(page);
  };

  return (
    <Container>
      <Button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        data-testid='previous'>
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          disabled={index + 1 === currentPage}
          data-testid={`page-${index + 1}-button`}
          style={
            index + 1 === currentPage
              ? {
                  background: "lightBlue",
                  color: "black",
                }
              : {}
          }>
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        data-testid='next'>
        Next
      </Button>
    </Container>
  );
};

export default Pagination;
