import styled from "styled-components";
import { getUserAuth } from "../store/user";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReactPlayer from "react-player";
import { serverTimestamp } from "firebase/firestore";

import { addDoc} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, postsRef } from "../firebase";

const PostModal=({onExit})=>{
    const user= useSelector(getUserAuth());
    const [text,setText]=useState("");
    const [Image,setImage]=useState("");
    const [vedioLink,setvedioLink]=useState("");
    const [assetArea,setassetArea]=useState("");

    const handleImage=(e)=>{
        const image=e.target.files[0];

        if(image==="" || image===undefined){
            alert("Please choose correct file format");
        }
        setImage(image);
    }

    const handleReset=()=>{
        setText("");
        setImage("");
        setvedioLink("");
    }

    const handleAsset=(area)=>{
        setImage("");
        setvedioLink("");
        setassetArea(area);
    }

    const handlePost=(post)=>{
      if(!assetArea && !text){
        return;
      }
      const postBody = {
        avatarURL: user.photoURL,
        author: user.displayName,
        info: "Lindkedin Member",
        date: new Date().toDateString(),
        timestamp: serverTimestamp(),
        description: text,
        media: {},
      };

      if(!assetArea){
        addDoc(postsRef,postBody);
      }
      else if(vedioLink){
           postBody.media.videoURL=vedioLink;
           addDoc(postsRef,postBody);
      }
      else if (Image) {
        console.log(Image);
        const storageRef = ref(storage,`images/${Image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, Image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (err) => alert(err.message),
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((result) => {
                postBody.media.imageURL = result;
                addDoc(postsRef, postBody);
              })
              .catch((err) => alert(err.message));
          }
        );
      }
      onExit();
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
                       
                       { assetArea ==="image" ? (
                        <UploadImage>
                            <input 
                              type="file"
                              accept="image/png, image/jpeg, image/jpg, image/gif"
                              name="image"
                              id="file"
                              style={{display:"none"}}
                              onChange={handleImage}
                            />
                           
                            {Image && <img src={URL.createObjectURL(Image)}/>}
                        </UploadImage>
                       ):( assetArea==="vedio" &&
                        <UploadVedio>
                            <input
                             id="vedio"
                             type="text"
                             placeholder="Embed a video link"
                             value={vedioLink}
                             onChange={(e)=>{setvedioLink(e.currentTarget.value)}}
                            />

                            {vedioLink && <ReactPlayer width="100%" url={vedioLink} onError={()=>setvedioLink("")}/>}
                        </UploadVedio>
                       )}
                    </Editor>
                </SharedContent>

                <SharedCreation>
                    <AttachAssets>
                        <AssetButton onClick={()=>handleAsset("image")}>
                            <label htmlFor="file">
                                <img src="/images/share-image.svg"/>
                            </label>
                        </AssetButton>
                        
                        <AssetButton onClick={()=>handleAsset("vedio")}>
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
                        <PostButton disabled={!text && !Image && !vedioLink ? true:false} onClick={handlePost}>Post</PostButton>
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
     height: auto;
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

const UploadImage =styled.div`
      text-align: center;
      
      
      img {
        width: 100%;
        
      }
`;
const UploadVedio=styled.div`
      input{
        border: none;
        outline: none;
      }
`;
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
        background-color: white;
      }
`;
const ShareComment=styled.div`
      padding-left: 18px;
      margin-right: auto;
      border-left: 1px solid rgba(0,0,0,0.15);
      ${AssetButton}{
        background-color: white;
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
      &:hover{
        background-color: rgba(0,0,0,0.3);
      }
`;
const PostButton=styled.button`
      color: ${(props)=> props.disabled ? "rgba(1,1,1,0.9)":"white"};
      background-color: ${(props)=> props.disabled ? "rgba(0,0,0,0.09)":"#0a66c2"};
      height: 40px;
      border: none;
      padding: 0 24px;
      border-radius: 25px;

      &:hover{
        background-color: ${(props) => props.disabled ? "rgba(0,0,0,0.3)":"#004182"};
      }
`;

export default PostModal;