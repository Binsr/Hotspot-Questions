
import javax.faces.bean.ManagedBean;

@ManagedBean

public class Question {

   private String text;
   private Byte[] picture;
   private String test;

   public Question() {}

   public String getText() {
      return this.text;
   }

   public void setText(String text) {
      this.text = text;
   }

   public Byte[] getPicture() {
      return picture;
   }

   public void setPicture(Byte[] picture) {
      this.picture = picture;
      this.test= picture.toString();
   }

   public String getTest() {
      return test;
   }

   public void setTest(String test) {
      this.test = test;
   }

}