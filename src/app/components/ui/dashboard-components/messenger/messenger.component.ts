import { Component } from '@angular/core';
import { ChatItem } from 'src/app/services/interfaces/iChatItem';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent {


  chatItems: ChatItem[] = [
    {
      profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUlz1U0tD1XCrGV3h1cajmk1lhVFru9Qabg&usqp=CAU",
      name: "Abhinav Nair",
      message: "Good Morning!",
      time: "12.00 AM",
      status: 'replied',
      count: '1'
    },
    {
      profileImg: "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?b=1&s=170667a&w=0&k=20&c=YQ_j83pg9fB-HWOd1Qur3_kBmG_ot_hZty8pvoFkr6A=",
      name: "Jessica Smith",
      message: "Hello, colleagues. Let's discuss the project updates in today's meeting.",
      time: "09.30 AM",
      status: 'replied',
      count: '3'
    },
    {
      profileImg: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.webp?b=1&s=170667a&w=0&k=20&c=V-RXoAk73ljzQZd0w_JcCFG-jlYs6sjpcrIZQ1TersQ=",
      name: "John Doe",
      message: "Greetings, team. I'll be reviewing the latest code changes this afternoon.",
      time: "03.45 PM",
      count: '2',
      status: 'sent',
    },
    {
      profileImg: "https://media.istockphoto.com/id/1471845315/photo/happy-portrait-or-business-woman-taking-a-selfie-in-office-building-for-a-social-media.webp?b=1&s=170667a&w=0&k=20&c=2-VGjlhPIjfj1I98HnA_qVM7TePchgVXe2y3TI65Y-0=",
      name: "Emily Johnson",
      message: "Good evening, everyone. I'm looking forward to our client presentation tomorrow.",
      time: "07.15 PM",
      count: '5',
      status: 'viewed',
    },
    {
      profileImg: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Michael Brown",
      message: "Hello team members. Let's finalize the project timeline during our meeting.",
      time: "10.00 AM",
      count: '2',
      status: 'replied',
    },
    {
      profileImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      name: "Sophia Williams",
      message: "Good afternoon. I'll be sending out the meeting agenda shortly.",
      time: "02.20 PM",
      count: '1',
      status: 'sent',
    },
    {
      profileImg: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Daniel Anderson",
      message: "Greetings, everyone. I'm available for any discussions or clarifications.",
      time: "06.30 PM",
      count: '1',
      status: 'viewed',
    }
  ];

}
