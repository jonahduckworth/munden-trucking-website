import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import StructuredData, {
  breadcrumbSchema,
} from "@/components/seo/StructuredData";

// In production, this would fetch from a database
const getArticle = (slug: string) => {
  const articles = {
    "turning-uncertainty-into-opportunity-forestry-evolution": {
      title:
        "Turning Uncertainty into Opportunity: The Evolution of Forestry in Western Canada",
      content: `
        <p>The forestry sector in British Columbia—and across much of Canada—is navigating a period of deep uncertainty. From ongoing softwood lumber tariffs to complex First Nations consultation processes and an increasingly demanding regulatory environment, it's no secret that our industry is under pressure. Harvesting levels continue to decline, and many contractors and manufacturers are asking the same question: Where do we go from here?</p>

        <p>History has shown that moments like this—where long-standing systems are challenged—often spark the most significant progress. When old models no longer fit the realities of new markets, technologies, and social expectations, innovation is not just an option—it becomes a necessity.</p>

        <p>At Munden Truck & Equipment Ltd., we've always believed that the forestry industry's strength lies in its ability to adapt. Our forests and our communities have weathered change before, and we'll do so again. But this time, the evolution may look different.</p>

        <h2>A Shift Toward Value, Not Just Volume</h2>
        <p>As the allowable annual cut in many timber supply areas continues to tighten, the economics of "conventional" full-tree or clear-cut logging are becoming increasingly difficult to sustain. Simply put, there's less fibre to harvest, and more scrutiny over how it's done. Yet demand for sustainably sourced, high-quality wood products continues to grow—both at home and abroad.</p>

        <p>This reality is forcing a shift in thinking: from maximizing volume to maximizing value. The future of forestry in Western Canada may depend not on how much we cut, but how intelligently and selectively we harvest.</p>

        <h2>Learning from Global Leaders</h2>
        <p>In Scandinavia, much of Europe, and increasingly in Eastern Canada, the industry has already embraced commercial thinning and selective harvesting as core components of sustainable forest management. Specialized equipment—like the EcoLog harvesters and forwarders we're proud to represent—has become the foundation of this evolution.</p>

        <p>These machines are designed for precision. They enable operators to remove select trees efficiently and with minimal impact to the surrounding stand—encouraging forest health, improving long-term yield, and providing an ongoing source of income rather than a once-per-rotation payout.</p>

        <p>While this approach is not yet widespread in Western Canada, the pressures we're experiencing are setting the stage for change. The economics, environmental expectations, and market dynamics are aligning in a way that makes this shift inevitable.</p>

        <h2>Turbulence Breeds Innovation</h2>
        <p>It often takes turbulence to drive transformation. When challenges mount, the innovators step forward. Those willing to test new models, adopt emerging technology, and rethink traditional practices become the leaders of the next era.</p>

        <p>We see tremendous opportunity ahead for forward-thinking contractors and licensees who are ready to adapt—those who see the potential in smaller, more agile operations that prioritize stand improvement, reduced environmental footprint, and long-term sustainability.</p>

        <h2>A Future Worth Building</h2>
        <p>There's no question that the road ahead for forestry in British Columbia is uncertain. But uncertainty doesn't have to mean decline. It can mean renewal. The very forces challenging our industry today may be the ones that ultimately shape a stronger, more resilient, and more value-driven future.</p>

        <p>At Munden Truck & Equipment, we're proud to support the people and the ideas that are helping build that future—because the evolution of forestry isn't coming someday; it's already begun.</p>
      `,
      excerpt:
        "The forestry sector in British Columbia is navigating a period of deep uncertainty. From ongoing softwood lumber tariffs to complex First Nations consultation processes, our industry is under pressure. But history has shown that moments like this often spark the most significant progress.",
      category: "Industry Insights",
      author: "Nolan Munden",
      date: "2025-11-14",
      readTime: "6 min read",
    },
    "turning-jobs-into-careers-employee-retention": {
      title: "Turning Jobs Into Careers: Keys to Employee Retention in Trucking",
      content: `
        <p>As a fourth-generation company, we truly understand the importance of long-term satisfied employees. As we've welcomed the "fifth generation" into our lives, I wanted to share some insights into what we've found to be keys for success in our industry for employee retention. As a company, we have a core belief around creating careers rather than just jobs.</p>

        <h2>Benefits Packages</h2>
        <p>We are in an economic period where many businesses are looking at ways of cutting costs to maintain the bottom line. A line item that has been under considerable pressure is the topic of employee benefits packages. As an industry, we have watched a slow erosion of benefits packages and understand the anxiety this can cause in employee households. At Munden, we've taken a contrarian approach and have been steadily improving the quality of our benefits packages for our employees and their families. The importance of benefits can be easily overlooked, but it holds considerable weight in why a potential employee considers coming to work for you.</p>
        <p>Yes, it costs more as an employer to increase employee benefits, but I would argue that the increased investment in employee benefits is far less than the costs associated with having to recruit and train new employees as a result of losing quality staff to other opportunities that provide better benefits.</p>

        <h2>Retirement Savings Plans</h2>
        <p>As business owners we often think about our eventual retirement, succession plans, and exit strategies. These same concerns are with all of your employees. Working with your staff to help them prepare for a successful and stress-free retirement goes a long way in developing a stable and happy workforce.</p>
        <p>It takes a lot of planning and preparation for employees to enjoy their retirement years. While most people want to get to a point where they don't have to trudge into work each day, that time may never come if they aren't prepared financially. While the burden might be on employees to save enough for retirement, at Munden we believe the employers should share in the responsibility.</p>
        <p>We've worked with our providers to make retirement savings plans available for all employees in our organization. There are many major benefits in offering retirement benefits to your employees, from increasing productivity to attracting new talent. An employee retirement plan can be the backbone of your benefits package and an essential ingredient of a positive company culture that increases employees' general well-being.</p>

        <h2>Hourly Pay for Professional Drivers and Overtime</h2>
        <p>Overtime for Professional Drivers has been a contentious issue for years. Many employers have used creative ways to skirt the requirements for paying overtime in the trucking industry. At Munden we look at overtime for our truck drivers the same way we do with any position in our business. If you work more than the normal legislated daily hours as a driver, you are entitled to overtime is how we view it. This makes a big difference in how drivers view working extra hours and can have a substantial positive impact on their annual income.</p>

        <h2>Using Technology in Your Workplace</h2>
        <p>When you hear the words innovation and technology it might not conjure up images in your mind of trucking and heavy duty mechanical, but maybe it should! We've seen significant innovation and use of technology in our industry over the past 10 years, and Munden has been an early adopter and advocate for innovation throughout all aspects of our company.</p>
        <p>Our drivers and mechanics were some of the first to use ELDs (Electronic Logs) in Canada. One look in our mechanical shop and you'll see our service techs working from iPads and Chromebooks. Yes, technology is here to stay and the quicker you can help your employees use these tools the sooner it will start making their jobs easier.</p>
        <p>I'm not trying to make light of how challenging change can be in any organization, but I feel it's important to realize that without finding creative ways to help your employees look at change, technology, and innovation, you are going to lose ground in your business, and your employees will not benefit from these high-demand skills.</p>
        <p>We find using a collaborative approach to bringing in technology works best. Involve your employees and team leaders into the decision-making process. Assess the different solutions that are currently available and choose technology that is user-friendly and ones that you can measure the return on investment.</p>

        <h2>Safety is More Than Lip Service</h2>
        <p>"Safety first." That's a popular buzz phrase, but how many of us really practice what we preach? How often do you consider safety issues for your drivers and mechanics? Have you checked your safety practices lately? Are they up to date? Are they still relevant to your current processes? Do you even know?</p>
        <p>When it comes down to it, there's more to business than the bottom line. Our employees rely on us to provide a safe environment for them to earn a living. They are our most valuable assets—but they're far more than that, too. Their physical welfare should be our top priority.</p>
        <p>At Munden we know that employees understand the difference between "lip service" and actual commitment to safety plans, training, and equipment. If you want long-term career employees, a big step is to ensure you put their safety first every day of the week. Sometimes you will need to make those hard choices of keeping some equipment off the road until you can be 100% sure it is operating properly, your employees are rested and ready, or conditions improve.</p>

        <h2>Training and Advancement from Within</h2>
        <p>Help your employees outline a potential career path within the organization so they can better visualize their future at the company. Identify specific milestones for achievement, and the supporting resources employees will likely need to tap along their journey.</p>
        <p>Establishing a formal mentoring program might be one of the smartest moves a company can make at any time—for itself as well as for its workers' personal and professional growth. I recommend getting involved in industry initiatives to foster developing people. For us, our involvement in bringing up apprentice mechanics through our partnership with Skilled Trades BC, and our ongoing work with the BCTA and CTA in improving the image of our great driver community—these initiatives have been just as rewarding for us as it has for the people we have either introduced to the industry, or helped to grow within the industry.</p>
        <p>Hard work is a prerequisite for career advancement, but that doesn't necessarily mean committing to an endless series of lengthy workdays. Encourage your employees to work smart, maximize their efficiency, and leave time and energy for their non-work interests.</p>

        <h2>What You Can Expect</h2>
        <p>Long-term employee loyalty begins with a commitment to continuously assessing your operation and practices and striving to create an environment where employees thrive. At Munden we have regular meetings with team leads to get feedback on how we are doing as an organization. We encourage feedback and an open dialogue. This has resulted in a large percentage of our employees being with us for years, and within our culture we believe a great work environment leads to employees feeling as though work and their workmates are their second family!</p>
        <p>If you are interested in a career with our team, visit <a href="https://mundengroup.ca/" style="color: #7D3038; text-decoration: underline;">mundengroup.ca</a> or send us an email at <a href="mailto:admin@mundengroup.ca" style="color: #7D3038; text-decoration: underline;">admin@mundengroup.ca</a>.</p>
`,
      excerpt: "As a fourth-generation company, we understand the importance of long-term satisfied employees. Here are some insights into what we've found to be keys for success in employee retention.",
      category: "Company Culture",
      author: "Nolan Munden",
      date: "2025-12-10",
      readTime: "8 min read",
    },
    "steering-suspension-systems-checked": {
      title: "When Should You Have Your Truck's Steering & Suspension Systems Checked?",
      content: `
        <p>At Munden Truck & Equipment Ltd., trucks are our business. We drive them, we service them, we repair them. Our truck and trailer repair shop in Kamloops is committed to providing quality, cost-effective commercial vehicle maintenance and repairs.</p>
        <p>Properly working steering and suspension systems are critical to the safe usage of a commercial vehicle. Your suspension system is what's holding up your commercial truck and the load you're carrying. Your steering system is what's keeping your truck between the lines. For your safety and that of others on the road, both the suspension and steering systems on your truck must be in proper working order. Safety is at the forefront of what we do, and we want to make sure our customers know how to spot a problem before it becomes a safety issue.</p>
        <p>On a new truck, steering and suspension issues shouldn't be a concern, but as the truck ages, problems can arise, such as worn steering components, a loose steering wheel column, missing or defective axle position parts, and pressure loss in air suspension to name a few. Some of these issues may be difficult to notice without getting under your truck, but there are a few tips to help you spot a problem.</p>

        <h2>Red Flags for Suspension Issues</h2>
        <ul>
          <li>If you are feeling more bumps or shaking while you drive, you could have an issue with your suspension. Driving with worn shocks is uncomfortable, impacts safety, increases the likelihood of expensive repairs, and leads to unwelcome downtime.</li>
          <li>Your vehicle should be relatively level. To check, walk around your truck while it is parked and look at how it's sitting. If one side is significantly higher than the other, you should have your suspension checked.</li>
        </ul>

        <h2>Red Flags for Steering Issues</h2>
        <ul>
          <li>Is your truck pulling to the side or making knocking or squealing sounds? If so, you may have an issue.</li>
          <li>Does your steering feel rough? Is it making clicking or grinding sounds? If so, there may be a problem with your steering column, your steering box, or any of the components in between the two, and you should book an appointment to have it checked out.</li>
        </ul>

        <p>If you think any of these red flags apply to your vehicle, you should take your truck to a mechanic sooner than later. If you're in the Kamloops area, drop by or have us send out a mobile mechanic. We have fully equipped mobile service trucks and offer Emergency Roadside Repairs seven days a week. From one-off, emergency repairs to scheduled preventative maintenance programs, let us work with you to look after your every need. No repair is too small, or too large.</p>
        <p>Regular preventative maintenance usually ensures issues don't occur, so make sure to have your commercial truck maintained regularly. At Munden Truck & Equipment, we will create a maintenance schedule that works for you. Visit our Parts & Service Department for more details.</p>
        <p>Most repairs to a truck's steering system/components should be followed by an alignment to ensure that the alignment hasn't been impacted by component changes or repairs. Munden Truck & Equipment offers repair services to steering and suspension as well as heavy-duty alignments.</p>
`,
      excerpt: "Properly working steering and suspension systems are critical to the safe usage of a commercial vehicle. Here\'s how to spot problems before they become safety issues.",
      category: "Maintenance Tips",
      author: "Munden Truck & Equipment",
      date: "2026-01-15",
      readTime: "4 min read",
    },
    "prevent-freeze-ups-commercial-truck-air-system": {
      title: "What Can Be Done to Prevent Freeze Ups in Your Commercial Truck and Trailer Air System?",
      content: `
        <p>For over five decades, Munden Truck & Equipment has been providing a wide range of commercial truck and trailer maintenance services to customers and clients in the Kamloops and BC Interior Region.</p>
        <p>Munden Truck & Equipment has a rich history serving the British Columbia forestry industry and, although we began as a small operation in Savona, BC, the company has grown over the last several decades to include third-party commercial vehicle maintenance and heavy-duty services.</p>
        <p>As part of our repair services, we regularly provide air system maintenance and other mechanical repairs for commercial trucks and trailers. As such, during the colder, winter months it's important to ensure that your commercial truck and trailer air systems don't freeze up. Freeze-ups are even more common during the shoulder seasons, as temperatures often fluctuate widely from well below to above 0 degrees.</p>
        <p>Winter temperatures can take their toll on your systems, but that doesn't mean it's impossible to prevent or handle. Being prepared first and foremost will help prevent freeze-ups and will also save money and time.</p>
        <p>With that in mind, here are a few tips to keep in mind to avoid potential freeze-ups.</p>

        <h2>Invest in Automatic Drain Valves</h2>
        <p>Naturally during the winter months, as snow and ice melt it's inevitable that it will turn into condensed water, which can be damaging to your air-brake system. In colder climates, ice can block the air from reaching the brake mechanism and lead to the wheels locking, which is dangerous.</p>
        <p>Automatic drain valves can prevent this problem, and modern systems may already have these installed. If you're not sure, check to see if you have them installed, and then monitor the valves regularly to make sure they're working properly.</p>

        <h2>Air Dryers</h2>
        <p>Air dryers are integral in keeping your system running, and in colder weather water can freeze in the valves thus creating problems with your air-brake system. That's why it's important to regularly maintain your air dryer, which includes having it filtered properly according to the manufacturer's recommendations.</p>

        <h2>Drain Air Tanks Daily</h2>
        <p>Moisture in the lines will no doubt affect the entire air system, which is why the air tanks should be drained daily, particularly during the winter months. Doing so will discharge moisture in the tanks, which over time will accumulate and end up in the lines and freeze.</p>
        <p>You can also keep a bottle of airline antifreeze on hand. If the airlines are frozen, add airline antifreeze into the supply line and air up the trailer. Use airline antifreeze sparingly—more is not always better. It generally only takes a small amount of airline antifreeze to do the trick. Using too much airline antifreeze can also cause long-term valve problems.</p>

        <h2>Contact Munden Truck & Equipment</h2>
        <p>If you need assistance with maintenance and repairs for freeze-up prevention, here at Munden we're more than happy to help.</p>
        <p>Stop by our service department, which is a modern, 10-bay government-certified inspection facility where we can help with any freeze prevention needs. Our shop has the most convenient hours of any shop in the BC interior—open seven days a week from 7 am to midnight, every day.</p>
        <p>Learn more about our <a href="/services/service-department" style="color: #7D3038; text-decoration: underline;">Parts & Service Department</a> to see how we can help you today.</p>
`,
      excerpt: "Winter temperatures can take their toll on your air systems. Being prepared will help prevent freeze-ups and save money and time.",
      category: "Maintenance Tips",
      author: "Munden Truck & Equipment",
      date: "2026-02-01",
      readTime: "5 min read",
    },
  };

  return articles[slug as keyof typeof articles] || null;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | Munden Truck & Equipment Resources`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "About", url: "https://mundentruckequipment.com/about" },
    {
      name: "Resources",
      url: "https://mundentruckequipment.com/about/resources",
    },
    {
      name: article.title,
      url: `https://mundentruckequipment.com/about/resources/${slug}`,
    },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />

      <article className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/about/resources">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Share Button */}
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share Article
              </Button>
            </header>

            {/* Featured Image */}
            <div className="aspect-video relative bg-muted mb-8 rounded-lg overflow-hidden">
              <Image
                src="/images/equipment/blog1.jpeg"
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            <div
              className="mb-12"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
              }}
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/<h2>/g, '<h2 style="color: #7D3038; font-size: 1.875rem; font-weight: 700; margin-top: 4rem; margin-bottom: 2rem;">')
                  .replace(/<p>/g, '<p style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 2rem;">')
                  .replace(/<ul>/g, '<ul style="list-style-type: disc; padding-left: 2rem; margin-bottom: 2rem;">')
                  .replace(/<li>/g, '<li style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 1rem;">')
                  .replace(/<a /g, '<a style="color: #7D3038; text-decoration: underline;" ')
              }}
            />

            {/* CTA Section */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Need More Information?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact our team to learn more about our equipment and services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/about/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/equipment/ecolog">Browse Equipment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
