import { Navbar } from '@/components/NavBar';
import { Toaster } from "@/components/ui/sonner";
import { authStore } from '@/store/auth.store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";


const HomePage = () => {
  const { user, isSubscriber, isAuthenticated ,subscribe,checkAuth} = authStore();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAuth = async () => {
        await checkAuth();
    };
    verifyAuth();
  }, [user, checkAuth]);
  useEffect(() => {
    if (user && !isAuthenticated) {
      toast.error("You are not Authenticated");
    }
  }, [user, isAuthenticated]);

  const handleSubscribe = async() => {
    if (isAuthenticated && user && !isSubscriber) {
        await subscribe();
        toast("You have subscibed successfully ");
    } else {
        toast("Please Login before subscibe");
      setTimeout(()=>{
        navigate('/login');
      },1300);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className="flex flex-col justify-center items-center gap-4 text-center p-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          DSA Consistency Sucks. We Fix It.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Get <span className="font-semibold">daily DSA problems</span> (asked at <span className="text-blue-600 font-medium">MANG</span> companies) delivered to your inbox — 
          curated, zero fluff, just progress.
        </p>

        {(!isSubscriber && isAuthenticated && user) || !user ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-4"
            onClick={handleSubscribe}
          >
            Subscribe Now →
            <Toaster />
          </button>
        ) : (
            <div  className="text-center p-4  rounded-lg bg-white shadow-sm">
              <h3 className="font-bold mt-2">YOU ARE A SUBSCRIBER !!</h3>
            </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-6 items-center max-w-2xl">
          {["Meta", "Amazon", "Netflix", "Google", "...etc"].map((company) => (
            <div key={company} className="font-mono font-bold text-gray-700">
              {company}
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground italic">
            "A structured and focused approach to practice helped me take real steps toward landing an opportunity at Google."
          </p>
          <p className="text-sm font-medium mt-2">— @SultanMoghal, Senior SDE at Samsung</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
          {[
            {
              icon: "📬",
              title: "Triple Daily Problems",
              desc: "MANG-level questions delivered at 10:30 AM, 5:00 PM & 8:30 PM."
            },
            {
              icon: "🏆",
              title: "Company-Specific",
              desc: "Each problem tagged with actual companies (e.g. 'Amazon 2023')"
            },
            {
              icon: "📈",
              title: "Progress Tracking",
              desc: "All questions archived with difficulty ratings in the ALL-Questions section."
            },
          ].map((item) => (
            <div key={item.title} className="text-center p-4 border rounded-lg bg-white shadow-sm">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="font-bold mt-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
