/// <reference types="react-scripts" />
declare namespace Component {
  type WithChildren<Props = object> = React.FC<React.PropsWithChildren<Props>>
  type WithoutChildren<Props = object> = React.FC<Props>
}
