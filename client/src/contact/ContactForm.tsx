
import { FormLayout } from "@astryxdesign/core/FormLayout";
import { TextInput } from "@astryxdesign/core/TextInput";
import { TextArea } from '@astryxdesign/core/TextArea'
import { Button } from "@astryxdesign/core/Button";

export const ContactForm = () => {

  return (
    <>
      <FormLayout>
        <TextInput label="Full Name" value={''} />
        <TextInput label="Email Address" value={''} />
        <TextInput label="Subject" value={''} />
        <TextArea label="Message" value={''} />
        <Button label="Submit" />
      </FormLayout>
    </>
  )
}
