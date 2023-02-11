import styled from "styled-components";
import { getUserAuth } from "../store/user";
import { useSelector } from "react-redux";
import { useState } from "react";

const PostModal=({onExit})=>{
    const user= useSelector(getUserAuth());
    const [text,setText]=useState("");

    const handleReset=()=>{
        setText("");
    }
    return (
        <Container>
            <Content>
                <Header>
                <h2>Create a post</h2>
                <button onClick={()=>onExit()}>
                  <img src="/images/close-icon.svg" alt=""/>
                </button>
                </Header>

                <SharedContent>
                    <UserInfo>
                        <img src={user?(user.photoURL):("/images/user.svg")} alt="user"/>
                        <span>{user?(user.displayName):("User")}</span>
                    </UserInfo>
                    
                    <Editor>
                        <textarea
                        value={text}
                        onChange={(e)=>setText(e.currentTarget.value)}
                         placeholder="What do you want to talk about?"
                        
                        />
{/* 
                        <UploadImage>
                            <input 
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/gif"
                              name="image"
                              id="file"
                              style={{display:"none"}}
                            />
                        </UploadImage>

                        <UploadVedio>
                            <input
                             id="vedio"
                             type="text"
                             placeholder="Embed a video link"
                            />
                        </UploadVedio> */}
                    </Editor>
                </SharedContent>

                <SharedCreation>
                    <AttachAssets>
                        <AssetButton>
                            <label htmlFor="file">
                                <img src="/images/share-image.svg"/>
                            </label>
                        </AssetButton>
                        
                        <AssetButton>
                            <label htmlFor="video">
                                <img src="/images/share-video.svg"/>
                            </label>
                        </AssetButton>    
                    </AttachAssets>

                    <ShareComment>
                            <AssetButton>
                                <img src="/images/share-comment.svg" alt=""/>
                                Anyone
                            </AssetButton>
                    </ShareComment>

                    <ButtonGroup>
                        <ResetButton onClick={handleReset}>Reset</ResetButton>
                        <PostButton>Post</PostButton>
                    </ButtonGroup>
                </SharedCreation>
            </Content>
        </Container>
    )
}

const Container = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      color: black;
      background-color: rgba(0,0,0,0.75);
`;

const Content = styled.div`
     width: 100%;
     max-width: 550px;
     height: 350px;
     background-color: #fff;
     max-height: 90%;
     overflow: initial;
     border-radius: 7px;
     position: relative;
     display: flex;
     flex-direction: column;
     top: 30px;
     margin: 0 auto;

     @media screen and (max-width: 540px) { 
        top: 0;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
     }
`;
const Header=styled.header`
      display: block;
      padding: 0 15px;
      padding: 15px;
      border-bottom: 1px solid rgba(0,0,0,0.15);
      font-size: 16px;
      line-height: 1.5;
      color: rgba(0,0,0,0.6);
      font-weight: 400;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        background-color: rgba(0,0,0,0.02);
        border: none;
        svg{
            pointer-events: none;
        }
      }
`;
const SharedContent=styled.div`
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow-y: auto;
      vertical-align: baseline;
      background: transparent;
`;
const UserInfo=styled.div`
      display: flex;
      align-items: center;
      padding: 12px 24px;

      svg,img{
        width: 40px;
        height: 40px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
      }
      span{
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        margin-left: 7px;
      }
`;
 
const Editor =styled.div`
      padding: 12px 24px;

      textarea{
        width: 100%;
        min-height: 100px;
        resize: none;
        border: none;
        outline: none;
      }

      input{
        width: 100%;
        height: 35px;
        font-size: 1.1rem;
        margin-bottom: 20px;
      }
`;

// const UploadImage =styled.div`
//       text-align: center;
//       img {
//         width: 100%;
//       }
// `;
// const UploadVedio=styled.div`
// `;
const SharedCreation=styled.div`
      display: flex;
      justify-content: space-between;
      padding: 10px 16px;
      border-top: 1px solid rgba(0,0,0,0.15);
`;
const AssetButton=styled.button`
     display: flex;
     align-items: center;
     height: 40px;
     color: rgba(0,0,0,0.5);
     transition-duration: 167ms;
     border: none;
     label{
        cursor: pointer;
     }
     &:active{
        transform: scale(0.95);
     }
`;
const AttachAssets=styled.div`
      display: flex;
      align-items: center;
      padding-right: 8px;
      ${AssetButton}{
        width: 40px;
        background-color: rgba(0,0,0,0.02);
      }
`;
const ShareComment=styled.div`
      padding-left: 18px;
      margin-right: auto;
      border-left: 1px solid rgba(0,0,0,0.15);
      ${AssetButton}{
        background-color: rgba(0,0,0,0.02);
        img{
            margin-right: 5px;

        }
      }
      `;
const ButtonGroup=styled.div`
      display: flex;
      align-items: center;
      gap: 10px;
`;
const ResetButton=styled.button`
      padding: 0 24px;
      border-radius: 25px;
      height: 40px;
      border: none;
      background-color: rgba(0,0,0,0.045);
`;
const PostButton=styled.button`
      color: #fff !important;
      background-color: #0a66c2;
      height: 40px;
      border: none;
      padding: 0 24px;
      border-radius: 25px;
`;

export default PostModal;