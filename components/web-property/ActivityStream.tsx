import {
  Label, List,
  ListItem, Text, TextContent, TextVariants
} from "@patternfly/react-core";
import styled from 'styled-components';


const DivStyle = styled.div({
  height: "590px",
  width: "1017px",
  background: "var(---ffffff) 0% 0% no-repeat padding-box; #FFFFFF 0% 0% no-repeat padding-box;",
  border: "1px solid #D2D2D2;",
  opacity: "1;",
});

const ActivityStream = ({ webprop }: any) => {
  return (
    <>
      <TextContent>
        <Text component={TextVariants.h1}>Activity Stream</Text>
      </TextContent><br></br>
      <DivStyle>
        <div>
          <br></br>
          <List>
            {webprop.map((e: any) => (
              <ListItem key={e.id}>
                <TextContent>
                  <Text component={TextVariants.h5}>
                    {/* <Link to={getSPALink(e.name, e.name)} style={{ textDecoration: "none" }}>
                <label color="green">{e.name}</Label>
              </Link> */}
                    <Label color="green">SPA Name : {e.spaName}</Label> &nbsp; &nbsp;
                    Status : {e.code},
                    Env : {e.envs},
                    Branch : {e.branch},
                    Created At : {e.createdAt}
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
