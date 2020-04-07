import styled from 'styled-components';

const ChipContainer = styled.div`
  background-color: #ededed;
  border-radius: 50px;
  padding: 5px 10px;
  .cross {
    font-size: 12px;
    border: 1px solid #999;
    background-color: #ededed;
    color: #999;
    border-radius: 50%;
    margin-left: 5px;
  }
`;

const TagChip = ({ className, onDelete, children }) => {
  return (
    <ChipContainer className={className}>
      <span>{children}</span>
      <button onClick={() => onDelete(children)} className="cross">x</button>
    </ChipContainer>
  )
}

export default TagChip