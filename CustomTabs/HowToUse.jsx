"use client";
import Tabs from "@/Components/Shared/CustomTabs/Tabs";

const HowToUse = () => {
  return (
    <section>
      <Tabs defaultTab="1">
        <Tabs.List>
          <Tabs.Tab id="1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="2">Tab 2</Tabs.Tab>
          <Tabs.Tab id="3">Tab 3</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panels>
          <Tabs.Panel id="1">Tab 1 content </Tabs.Panel>
          <Tabs.Panel id="2"> Tab 2 content </Tabs.Panel>
          <Tabs.Panel id="3">Tab 3 content </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </section>
  );
};

export default HowToUse;
