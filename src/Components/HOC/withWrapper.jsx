export default function withWrapper(Components) {
  const WrappedComponent = (props) => {
    return (
      <div className="w-[1119px] max-w-[calc(100%-30%)] mx-auto">
        <Components {...props} />
      </div>
    );
  };

  WrappedComponent.displayName = `WithWrapper(${
    Components.displayName || Components.name || "Component"
  })`;

  return WrappedComponent;
}
