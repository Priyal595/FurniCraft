import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Award, Users, Globe, Recycle } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Every piece is meticulously crafted by skilled artisans using premium materials and time-honored techniques.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction with exceptional service, easy returns, and lifetime support.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving customers worldwide with carefully curated collections from international designers.'
    },
    {
      icon: Recycle,
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and sustainable materials for a better tomorrow.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">About FurniCraft</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For over a decade, FurniCraft has been at the forefront of furniture design, 
            creating pieces that transform houses into homes and spaces into sanctuaries.
          </p>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010 by furniture artisan Raghav Sharma, FurniCraft began as a small 
                  workshop in Punjab, India. What started as a passion project to create 
                  beautiful, functional furniture has grown into a trusted brand serving customers 
                  across the globe.
                </p>
                <p>
                  Our journey has been guided by a simple philosophy: furniture should be more 
                  than functional—it should inspire, comfort, and endure. Every piece we create 
                  tells a story of dedication to quality, attention to detail, and respect for 
                  traditional craftsmanship.
                </p>
                <p>
                  Today, we work with a network of skilled artisans and designers who share our 
                  commitment to excellence. From our sustainable sourcing practices to our 
                  customer-first approach, everything we do is designed to exceed expectations.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&h=400&fit=crop" 
                alt="Craftsman at work"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate people behind FurniCraft
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
                name: 'Raghav Sharma',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
                bio: 'Visionary leader with 25+ years in furniture design and craftsmanship.'
              },
              {
                name: 'Priyal Singh',
                role: 'Head of Design',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=300&h=300&fit=crop',
                bio: 'Award-winning designer specializing in modern and contemporary furniture.'
              },
              
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="text-center bg-muted/30 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            To create exceptional furniture that enhances lives, inspires creativity, and stands the test of time. 
            We believe that great design should be accessible to everyone, and we're committed to making 
            beautiful, functional furniture that brings joy to homes around the world.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
