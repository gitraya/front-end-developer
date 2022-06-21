import Input from "./Input/Input";

const Main = () => {
  return (
    <main>
      <h2 className="ft-500 ft-poppins cl-gytwo">Inputs</h2>
      <div className="demo-container">
        <div className="demo-item">
          <small>{"<Input />"}</small>
          <Input label="Label" placeholder="Placeholder" id="demo" />
        </div>
        <div className="demo-item">
          <small className="cl-hover">{"&:hover"}</small>
          <Input label="Label" placeholder="Placeholder" id="demo1" />
        </div>
        <div className="demo-item">
          <small className="cl-hover">{"&:focus"}</small>
          <Input label="Label" placeholder="Placeholder" id="demo2" />
        </div>
      </div>
      <div className="demo-container">
        <div className="demo-item">
          <small>{"<Input error />"}</small>
          <Input label="Label" placeholder="Placeholder" id="demo3" error />
        </div>
        <div className="demo-item">
          <small className="cl-hover">{"&:hover"}</small>
          <Input label="Label" placeholder="Placeholder" id="demo4" error />
        </div>
        <div className="demo-item">
          <small className="cl-hover">{"&:focus"}</small>
          <Input label="Label" placeholder="Placeholder" id="demo5" error />
        </div>
      </div>
      <div className="demo-container">
        <div className="demo-item">
          <small>{"<Input disabled />"}</small>
          <Input label="Label" placeholder="Placeholder" id="demo6" disabled />
        </div>
      </div>
      <div className="demo-container">
        <div className="demo-item">
          <small>{"<Input helperText=”Some interesting text” />"}</small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo7"
            helperText="Some interesting text"
          />
        </div>
        <div className="demo-item">
          <small className="cl-hover">
            {"<Input helperText=”Some interesting text” error />"}
          </small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo8"
            helperText="Some interesting text"
            error
          />
        </div>
      </div>
      <div className="demo-container">
        <div className="demo-item">
          <small>{"<Input startIcon />"}</small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo9"
            startIcon={<i class="material-icons">local_phone</i>}
          />
        </div>
        <div className="demo-item">
          <small className="cl-hover">{"<Input endIcon />"}</small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo10"
            endIcon={<i class="material-icons">lock</i>}
          />
        </div>
      </div>
      <div className="demo-container">
        <div className="demo-item">
          <small>{"<Input value=”text” />"}</small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo11"
            value="Text"
          />
        </div>
      </div>
      <div className="demo-container">
        <div className="demo-item">
          <small>{"<Input size=”sm” />"}</small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo12"
            size="sm"
          />
        </div>
        <div className="demo-item">
          <small>{"<Input size=”md” />"}</small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo13"
            size="md"
          />
        </div>
      </div>
      <div className="demo-container">
        <div className="demo-item full">
          <small>{"<Input fullWidth />"}</small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo14"
            value="Text"
            fullWidth
          />
        </div>
      </div>
      <div className="demo-container">
        <div className="demo-item full">
          <small>{"<Input multiline row=”4” />"}</small>
          <Input
            label="Label"
            placeholder="Placeholder"
            id="demo15"
            multiline
            row="4"
          />
        </div>
      </div>
    </main>
  );
};

export default Main;
