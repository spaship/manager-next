import {
  Label, List,
  ListItem, Text, TextContent, TextVariants
} from "@patternfly/react-core";
import { KeyIcon } from "@patternfly/react-icons";
import styled from 'styled-components';
import { ActivityProps, Properties } from "../models/props";

const DivStyle = styled.div({
  height: "590px",
  width: "1017px",
  border: "1px solid #D2D2D2;",
  opacity: "1;",
});

const BulletStyle = styled.text({
  content: "•",
  color: 'red',
});

const ActivityStream = ({ webprop }: Properties) => {
  return (
    <>
      <TextContent>
        <Text component={TextVariants.h1}>Activity Stream</Text>
      </TextContent><br></br>
      <DivStyle >
        <div >
          <br></br>
          <List>
            {webprop.map((activity: ActivityProps) => (
              <ListItem  key={activity.id}>
                <TextContent>
                  <Text component={TextVariants.small}>

                    <Label color="green"> {activity.spaName}</Label> &nbsp; &nbsp; has been deployed over &nbsp;
                    <Label color="green"> {activity.propertyName}</Label> on {activity.envs} at {activity.createdAt}<br />
                  </Text>
                </TextContent>
              </ListItem>
            ))}
          </List>
        </div>
      </DivStyle>
    </>
  );
};

export default ActivityStream;
