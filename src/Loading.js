import ReactLoading from 'react-loading';

const Loading = ({
  type = "spin",
  width = 40,
  height = 40,
  style = {},
}) => (
  <ReactLoading
    type={type}
    style={{
      width: `${width}px`,
      height: `${height}px`,
      ...style,
    }}
  />
)

export default Loading;
