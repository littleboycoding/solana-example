pub mod counter {
    use borsh::{BorshDeserialize, BorshSerialize};

    #[derive(BorshSerialize, BorshDeserialize)]
    pub struct Counter {
        pub counter: u32,
    }

    impl Counter {
        pub fn inc(&mut self) {
            self.counter += 1;
        }
        pub fn dec(&mut self) {
            self.counter -= 1;
        }
    }
}
